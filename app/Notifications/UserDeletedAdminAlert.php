<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserDeletedAdminAlert extends Notification
{
    use Queueable;

    public $userName;
    public $userEmail;

    /**
     * Create a new notification instance.
     */
    public function __construct($userName, $userEmail)
    {
        $this->userName = $userName;
        $this->userEmail = $userEmail;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Admin Alert: User Deleted')
            ->greeting('Hello Admin,')
            ->line('A user account has been deleted from Startup Tracker.')
            ->line('Name: ' . $this->userName)
            ->line('Email: ' . $this->userEmail)
            ->action('View Admin Dashboard', url('/admin/users'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'user_deleted',
            'title' => 'User Deleted',
            'message' => "User {$this->userName} ({$this->userEmail}) was removed.",
            'url' => '/admin/users',
        ];
    }
}
