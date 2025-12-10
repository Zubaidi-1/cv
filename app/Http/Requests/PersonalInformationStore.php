<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonalInformationStore extends FormRequest
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
            "first_name" => ["required", "string", "max:35"],
            "last_name" => ["required", "string", "max:30"],
            "email" => ["required", "string", "email", "max:255", "unique:personal_information,email"],
            "phone_number" => ["required", "string", "max:20"],
            "country" => ["required", "string", "max:56"],
            "city" => ["nullable", "string", "max:85"],
            "address" => ["nullable", "string", "max:255"],
            "date_of_birth" => ["nullable", "date"],
            "profile_picture" => ["nullable", "image", "max:2048"],
        ];
    }
}
