<?php

namespace App\Models;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manager extends Model
{
    use HasFactory;
    protected $table = "Manager";
    public $primaryKey = 'id_Manager';
    protected $fillable  = ["id_Admin", "email", "password", "status"];
    public $timestamps = false;

    public function admin()
    {
        return $this->belongsTo(Admin::class, "id_Admin");
    }
}
