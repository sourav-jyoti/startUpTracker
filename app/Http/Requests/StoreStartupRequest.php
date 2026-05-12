<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStartupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'sector' => ['required', 'string', 'max:100'],
            'funding_stage' => ['required', 'string', 'max:100'],
            'hq_location' => ['required', 'string', 'max:255'],
            'mission' => ['nullable', 'string', 'max:1000'],
            'website_url' => ['nullable', 'url', 'max:500'],
            'logo_url' => ['nullable', 'url', 'max:500'],
            'funding_amount' => ['nullable', 'numeric', 'min:0'],
            'founding_date' => ['nullable', 'date'],
            'competition' => ['nullable', 'string', 'max:255'],
            'registration_type' => ['nullable', 'string', 'max:255'],
            'certificate_number' => ['nullable', 'string', 'max:255'],
            'week_number' => ['nullable', 'integer', 'min:1', 'max:52'],
        ];
    }
}
