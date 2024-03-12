<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Emprunt;
use App\Models\Object_;
use Exception;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $admins = Admin::all();
            return ["results" => $admins, "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Check dict Exist
            if (!$request["dict"]) return ["err" => true, "err_msg" => "dict required in body | {dict: {'key': 'value'}}"];

            // Insert Element
            Admin::create($request["dict"]);
            $admins = Admin::all();
            return ["results" => $admins, "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $admin = Admin::find($id);

            if ($admin) return ["results" => $admin, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "id '$id' not exists"];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            if (!$request["seters"]) return ["err" => true, "err_msg" => "seters required in body | {seters: {'key': 'value'}}"];

            $admin = Admin::find($id);
            if ($admin) {
                $admin->update($request["seters"]);
                $admin->save();
                $admins = Admin::all();
                return ["results" => $admins, "err" => false, "err_msg" => ''];
            } else {
                return ["err" => true, "err_msg" => "id '$id' not exists"];
            }
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $res = Admin::destroy($id);
            if ($res === 0) return ["err" => true, "err_msg" => "id '$id' not exists"];
            else return ["results" => Admin::all(), "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /** 
     * Get All Managers For An Admin By Her ID
     */
    public function getManagers($id)
    {
        try {
            $admin = Admin::find($id);

            if ($admin) {
                $managers = $admin->managers;
                return ["results" => $managers, "err" => false, "err_msg" => ''];
            } else {
                return ["err" => true, "err_msg" => "id '$id' not exists"];
            }
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /** 
     * Get All Object Types For An Admin By Her ID
     */
    public function getObjectTypes($id)
    {
        try {
            $admin = Admin::find($id);

            if ($admin) {
                $object_types = $admin->object_types;
                return ["results" => $object_types, "err" => false, "err_msg" => ''];
            } else {
                return ["err" => true, "err_msg" => "id '$id' not exists"];
            }
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /** 
     * Get All Objects For An Admin By Her ID
     */
    public function getObjects($id)
    {
        try {
            $objects = Object_::with('object_type')->get()->where("id_Admin", "=", $id);
            $results = [];
            foreach ($objects as $object) {
                $object["type_name"] = $object->object_type->nom;
                unset($object["object_type"]);
                array_push($results, $object);
            }
            return ["results" => $results, "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /** 
     * Get All Emprunts For An Admin By Her ID
     */
    public function getEmprunts($id)
    {
        try {
            $emprunts = Emprunt::with('object_', 'user')->get()->where("object_.id_Admin", "=", $id);
            $results = [];
            foreach ($emprunts as $emprunt) {
                $emprunt["nom"] = $emprunt->object_->nom;
                $emprunt["email"] = $emprunt->user->email;
                unset($emprunt["object_"], $emprunt["user"]);
                array_push($results, $emprunt);
            }
            return ["results" => $results, "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }
}
