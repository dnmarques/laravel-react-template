<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->uuid,
            'text' => $this->text,
            'date' => $this->date ? $this->date->toDateString() : null,
            'completed_at' => $this->completed_at,
            'created_at' => $this->created_at,
        ];
    }
}
