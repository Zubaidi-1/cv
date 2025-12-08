<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EducationStore extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'degtree' => ['required', 'string', 'max:255'],
            'institution' => ['required', 'string', 'max:255'],
            'graduation_year' => ['required', 'digits:4', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'field_of_study' => ['nullable', 'string', 'max:255'],
            'gpa' => ['nullable', 'string', 'max:10'],


        ];
    }
}
