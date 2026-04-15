import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PromptService, Prompt } from '../../services/prompt';

@Component({
  selector: 'app-prompt-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prompt-detail.html',
  styleUrl: './prompt-detail.css',
})
export class PromptDetail implements OnInit {
  prompt: Prompt | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private promptService: PromptService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');

      if (idStr) {
        const id = parseInt(idStr, 10);

        this.promptService.getPrompt(id).subscribe({
          next: (data) => {
            console.log('Detail API Response:', data);
            this.prompt = data;
            this.cdr.detectChanges();
          },
          error: (err: any) => {
            console.error('Error fetching prompt:', err);
            this.error = 'Prompt not found or server error';
            this.cdr.detectChanges();
          }
        });
      }
    });
  }
}
