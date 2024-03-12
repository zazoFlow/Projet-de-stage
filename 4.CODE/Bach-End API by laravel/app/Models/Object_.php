<?php

namespace App\Models;

use App\Models\ObjectType;
use App\Models\Emprunt;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Object_ extends Model
{
    use HasFactory;
    protected $table = "Object";
    public $primaryKey = "id_Object";
    protected $fillable  = ["id_Admin", "id_ObjectType", "nom"];
    public $timestamps = false;

    public function object_type()
    {
        return $this->belongsTo(ObjectType::class, "id_ObjectType");
    }

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class, "id_Object");
    }
}
