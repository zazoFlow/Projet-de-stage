<?php

namespace App\Models;

use App\Models\Manager;
use App\Models\ObjectType;
use App\Models\Object_;
use App\Models\Emprunt;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    protected $table = "Admin";
    public $primaryKey = "id_Admin";
    protected $fillable  = ["email", "password", "status"];
    public $timestamps = false;

    public function managers()
    {
        return $this->hasMany(Manager::class, "id_Admin");
    }

    public function object_types()
    {
        return $this->hasMany(ObjectType::class, "id_Admin");
    }

    public function objects()
    {
        return $this->hasMany(Object_::class, "id_Admin");
    }

    public function emprunts()
    {
        return $this->hasManyThrough(Emprunt::class, Object_::class, "id_Admin", "id_Object");
    }
}
