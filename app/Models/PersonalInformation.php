<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonalInformation extends Model
{
    /** @use HasFactory<\Database\Factories\PersonalInformationFactory> */
    use HasFactory;
    protected $fillable = ["first_name", "last_name", "profile_picture", "email", "phone_number", "country", "city", "address", "date_of_birth", "user_id"];
    public function user(): BelongsTo
    {

        return $this->belongsTo(User::class);
    }
}
