<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    /** @use HasFactory<\Database\Factories\LayoutFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'thumbnail_path',
        'default_config',
        'user_id',
    ];
}
