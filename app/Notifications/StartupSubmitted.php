<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Startup;

class StartupSubmitted extends Notification
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
            ->subject('Startup Submitted Successfully: ' . $this->startup->name)
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('Congratulations! Your startup "' . $this->startup->name . '" was submitted successfully.')
            ->action('View Your Startup', url('/startups/' . $this->startup->slug))
            ->line('You can now receive upvotes and engage with the community.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_startup', // Uses the same rocket icon in the bell
            'title' => 'Startup Submitted',
            'message' => 'Your startup ' . $this->startup->name . ' was added successfully.',
            'url' => '/startups/' . $this->startup->slug,
        ];
    }
}
