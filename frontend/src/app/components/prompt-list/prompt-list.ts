import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PromptService, Prompt } from '../../services/prompt';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.css',
})
export class PromptList implements OnInit {
  prompts: Prompt[] = [];

  constructor(
    private promptService: PromptService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.promptService.getPrompts().subscribe({
      next: (data) => {
        console.log('API Response data:', data);
        this.prompts = data;
        this.cdr.detectChanges(); // Forces Angular to render the data
      },
      error: (err: any) => console.error('Failed to fetch prompts', err)
    });
  }
}
