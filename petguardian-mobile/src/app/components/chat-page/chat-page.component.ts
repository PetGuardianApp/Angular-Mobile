import { Component, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

interface ChatMessage {
  text: string;
  isMine: boolean;
}

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})

export class ChatPageComponent implements OnDestroy {
  private messageSubscription: Subscription;
  public messages: ChatMessage[] = [];

  chatMessage: FormGroup;

  constructor(private chatService: ChatService, private fb: FormBuilder, private storageService: StorageService) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('vetId');
    console.log(id);

    this.messageSubscription = this.chatService.message$.subscribe((message) => {
      this.messages.push({ text: message, isMine: false });
    });

    this.chatMessage = this.fb.group({
      message: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {
    // Start polling for messages when the component is initialized
    this.chatService.startPolling(this.storageService.SessionGetStorage("uid"));
  }

  ngOnDestroy() {
    // Stop polling for messages when the component is destroyed
    this.chatService.stopPolling();
    this.messageSubscription.unsubscribe();
  }

  isMyMessage(message: ChatMessage): boolean {
    // Implement your logic to determine if the message is yours
    // For example, compare the message sender with the current user
    // Replace this with your actual logic
    return message.isMine;
  }

  sendMessage() {
    console.log("sendMessage")
    console.log(this.chatMessage.value.message)
    this.messages.push({ text: this.chatMessage.value.message, isMine: true });
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('vetId');
    this.chatService.sendMessage(id || '', this.chatMessage.value.message)
    // Implement your logic to send a message
    // This could be a POST request to the API
    // Example: this.http.post(`${this.apiUrl}/messages`, { text: 'Hello, world!' }).subscribe();
    this.chatMessage.reset();
  }
}
