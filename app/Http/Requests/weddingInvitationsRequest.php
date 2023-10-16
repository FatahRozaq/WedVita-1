<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class weddingInvitationsRequest extends FormRequest
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
            'designId' => 'required|integer',
            'userId' => 'required|integer',
            'groomName' => 'required|string|max:255',
            'brideName' => 'required|string|max:255',
            'groomPhoto' => 'nullable|image|max:2048',
            'bridePhoto' => 'nullable|image|max:2048',
            'coverPhoto' => 'nullable|image|max:2048',
            'weddingDate' => 'required|date',
            'weddingTime' => 'required|',
            'weddingMap' => 'nullable|string|max:255',
            'weddingLocation' => 'required|string|max:255',
            'fatherOfGroom' => 'required|string|max:255',
            'motherOfGroom' => 'required|string|max:255',
            'fatherOfBride' => 'required|string|max:255',
            'motherOfBride' => 'required|string|max:255',
            'accountNumber' => 'required|string|max:255',
        ];
    }
}
