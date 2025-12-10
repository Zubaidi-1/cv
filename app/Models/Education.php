<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Education extends Model
{
    /** @use HasFactory<\Database\Factories\EducationFactory> */
    use HasFactory;
    protected $fillable = ['degree', 'institution', 'graduation_year', 'field_of_study', 'gpa', "user_id"];

    // ! belong to user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
