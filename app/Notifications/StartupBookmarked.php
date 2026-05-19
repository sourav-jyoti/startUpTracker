<?php

namespace App\Notifications;

use App\Models\Startup;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StartupBookmarked extends Notification
{
    use Queueable;

    public $startup;
    public $bookmarker;

    /**
     * Create a new notification instance.
     */
    public function __construct(Startup $startup, User $bookmarker)
    {
        $this->startup = $startup;
        $this->bookmarker = $bookmarker;
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
            ->subject('Your Startup was Bookmarked!')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('Great news! ' . $this->bookmarker->name . ' bookmarked / added your startup "' . $this->startup->name . '" to their watchlist.')
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
            'type' => 'bookmark',
            'title' => 'Startup Bookmarked',
            'message' => $this->bookmarker->name . ' bookmarked ' . $this->startup->name,
            'startup_id' => $this->startup->id,
            'bookmarker_id' => $this->bookmarker->id,
            'url' => '/startups/' . $this->startup->slug
        ];
    }
}
