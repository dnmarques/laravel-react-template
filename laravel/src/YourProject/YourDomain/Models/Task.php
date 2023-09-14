<?php

namespace YourProject\YourDomain\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'uuid',
        'user_id',
        'text',
        'description',
        'completed_at',
        'date',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'date' => 'date',
    ];
}
