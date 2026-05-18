<?php

namespace App\Notifications;

use App\Models\Startup;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StartupUpvoted extends Notification implements ShouldQueue
{
    use Queueable;

    public $startup;
    public $upvoter;

    /**
     * Create a new notification instance.
     */
    public function __construct(Startup $startup, User $upvoter)
    {
        $this->startup = $startup;
        $this->upvoter = $upvoter;
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
            ->subject('Your Startup got an Upvote!')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('Great news! ' . $this->upvoter->name . ' just upvoted your startup "' . $this->startup->name . '".')
            ->action('View Startup', url('/startups/' . $this->startup->slug))
            ->line('Keep up the good work!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'upvote',
            'title' => 'New Upvote',
            'message' => $this->upvoter->name . ' upvoted ' . $this->startup->name,
            'startup_id' => $this->startup->id,
            'upvoter_id' => $this->upvoter->id,
            'url' => '/startups/' . $this->startup->slug
        ];
    }
}
