<?php

namespace App\Notifications;

use App\Models\Startup;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewStartupAdded extends Notification implements ShouldQueue
{
    use Queueable;

    public $startup;

    /**
     * Create a new notification instance.
     */
    public function __construct(Startup $startup)
    {
        $this->startup = $startup;
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
            ->subject('New Startup Added: ' . $this->startup->name)
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('A new startup "' . $this->startup->name . '" has been added to the platform.')
            ->line('Sector: ' . $this->startup->sector)
            ->action('View Startup', url('/startups/' . $this->startup->slug))
            ->line('Discover and upvote new innovations!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_startup',
            'title' => 'New Startup',
            'message' => $this->startup->name . ' was just added to the platform.',
            'startup_id' => $this->startup->id,
            'url' => '/startups/' . $this->startup->slug
        ];
    }
}
