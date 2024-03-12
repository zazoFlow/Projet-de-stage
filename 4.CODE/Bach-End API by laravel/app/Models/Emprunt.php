<?php

namespace App\Models;

use App\Models\Object_;
use App\Models\User_;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Emprunt extends Model
{
    use HasFactory;
    protected $table = "Emprunt";
    public $primaryKey = "id_Emprunt";
    protected $fillable  = ["id_User", "id_Object", "Status"];
    public $timestamps = false;

    public function object_()
    {
        return $this->belongsTo(Object_::class, "id_Object");
    }

    public function user()
    {
        return $this->belongsTo(User_::class, "id_User");
    }
}
