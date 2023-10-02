<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class invitationDesignsRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'userId' => 'required|exists:users,id',
            'designName' => 'required|string|max:255',
            'designDescription' => 'nullable|string',
            'designImage' => 'nullable|image|max:2048',
            'price' => 'required|numeric|min:0',
            'designLink' => 'required|url',
        ];
    }
}
