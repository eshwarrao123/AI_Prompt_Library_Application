import json
import os

import redis
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Prompt

_redis_url = os.environ.get('REDIS_URL')
try:
    redis_client = redis.from_url(_redis_url, decode_responses=True) if _redis_url else None
except Exception:
    redis_client = None

@csrf_exempt
def prompt_list(request):
    if request.method == "GET":
        data = list(Prompt.objects.all().values())
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        title = body.get("title", "").strip()
        content = body.get("content", "").strip()
        complexity = body.get("complexity")

        errors = {}

        if len(title) < 3:
            errors["title"] = "Title must be at least 3 characters."

        if len(content) < 20:
            errors["content"] = "Content must be at least 20 characters."

        if complexity is None:
            errors["complexity"] = "Complexity is required."
        elif not isinstance(complexity, int) or not (1 <= complexity <= 10):
            errors["complexity"] = "Complexity must be an integer between 1 and 10."

        if errors:
            return JsonResponse({"errors": errors}, status=400)

        prompt = Prompt.objects.create(
            title=title,
            content=content,
            complexity=complexity,
        )

        return JsonResponse({
            "id": prompt.id,
            "title": prompt.title,
            "content": prompt.content,
            "complexity": prompt.complexity,
            "created_at": prompt.created_at,
        }, status=201)

    return JsonResponse({"error": "Method not allowed"}, status=405)


def prompt_detail(request, id):
    try:
        prompt = Prompt.objects.get(id=id)
    except Prompt.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    try:
        view_count = redis_client.incr(f"prompt:{id}:views")
    except (redis.exceptions.ConnectionError, AttributeError):
        view_count = 0

    return JsonResponse({
        "id": prompt.id,
        "title": prompt.title,
        "content": prompt.content,
        "complexity": prompt.complexity,
        "created_at": prompt.created_at,
        "view_count": view_count,
    })
