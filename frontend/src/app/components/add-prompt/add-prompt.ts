import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromptService } from '../../services/prompt';

@Component({
  selector: 'app-add-prompt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-prompt.html',
  styleUrl: './add-prompt.css',
})
export class AddPrompt {
  promptForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private promptService: PromptService,
    private router: Router
  ) {
    this.promptForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
      complexity: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onSubmit() {
    if (this.promptForm.invalid) {
      this.promptForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.promptService.createPrompt(this.promptForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/prompts']);
      },
      error: (err: any) => {
        console.error('Error creating prompt', err);
        this.error = 'Failed to save prompt. Please try again.';
        this.loading = false;
      }
    });
  }
}
