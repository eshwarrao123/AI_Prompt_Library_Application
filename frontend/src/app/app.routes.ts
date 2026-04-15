import { Routes } from '@angular/router';
import { PromptList } from './components/prompt-list/prompt-list';
import { PromptDetail } from './components/prompt-detail/prompt-detail';
import { AddPrompt } from './components/add-prompt/add-prompt';

export const routes: Routes = [
    { path: '', redirectTo: '/prompts', pathMatch: 'full' },
    { path: 'prompts', component: PromptList },
    { path: 'add-prompt', component: AddPrompt },
    { path: 'prompts/:id', component: PromptDetail },
];
