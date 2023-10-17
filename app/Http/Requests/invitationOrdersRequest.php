<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class invitationOrdersRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'designId' => 'required|integer',
            'userId' => 'required|integer',
            'invitationId' => 'required|',
            'orderDate' => 'required|date',
            'orderExpired' => 'required|date',
            'totalPrice' => 'required|',
            'orderStatus' => 'required|',
        ];
    }
}
