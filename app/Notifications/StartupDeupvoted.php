<?php

namespace App\Notifications;

use App\Models\Startup;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StartupDeupvoted extends Notification
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
            ->subject('Upvote removed from your Startup')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line($this->upvoter->name . ' removed their upvote from your startup "' . $this->startup->name . '".')
            ->action('View Startup', url('/startups/' . $this->startup->slug));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'deupvote',
            'title' => 'Upvote Removed',
            'message' => $this->upvoter->name . ' removed upvote from ' . $this->startup->name,
            'startup_id' => $this->startup->id,
            'upvoter_id' => $this->upvoter->id,
            'url' => '/startups/' . $this->startup->slug
        ];
    }
}
