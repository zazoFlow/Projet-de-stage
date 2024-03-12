<?php

namespace App\Models;

use App\Models\Emprunt;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_ extends Model
{
    use HasFactory;
    protected $table = "User";
    public $primaryKey = "id_User";
    protected $fillable  = ["email", "password", "status"];
    public $timestamps = false;

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class, 'id_User');
    }
}
