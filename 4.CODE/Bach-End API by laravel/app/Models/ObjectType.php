<?php

namespace App\Models;

use App\Models\Object_;
use App\Models\Emprunt;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjectType extends Model
{
    use HasFactory;
    protected $table = "ObjectType";
    public $primaryKey = "id_ObjectType";
    protected $fillable  = ["id_Admin", "nom"];
    public $timestamps = false;

    public function objects()
    {
        return $this->hasMany(Object_::class, "id_ObjectType");
    }

    public function emprunts()
    {
        return $this->hasManyThrough(Emprunt::class, Object_::class, "id_Object", "id_ObjectType");
    }
}
