<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Experience extends Model
{
    /** @use HasFactory<\Database\Factories\ExperienceFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'company',
        'start_date',
        'end_date',
        'description',
        'user_id',
        'location',
    ];
    // * Relations *//
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
