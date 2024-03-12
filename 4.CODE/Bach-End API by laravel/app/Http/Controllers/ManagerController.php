<?php

namespace App\Http\Controllers;

use App\Models\Manager;
use Exception;
use Illuminate\Http\Request;

class ManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $managers = Manager::all();
            return ["results" => $managers, "err" => false, "err_msg" => ''];
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
            Manager::create($request["dict"]);
            return ["results" => Manager::all(), "err" => false, "err_msg" => ''];
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
            $manager = Manager::find($id);

            if ($manager) return ["results" => $manager, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "id '$id' not exists"];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(manager $manager)
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
            $manager = Manager::find($id);
            if ($manager) {
                $manager->update($request["seters"]);
                $manager->save();
                return ["results" => Manager::all(), "err" => false, "err_msg" => ''];
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
            $res = Manager::destroy($id);
            if ($res === 0) return ["err" => true, "err_msg" => "id '$id' not exists"];
            else return ["results" => Manager::all(), "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Get All Object Types For A Manager With Her ID
     */
    public function getObjectTypes($id)
    {
        try {
            $manager = Manager::find($id);

            if ($manager) {
                $admin = $manager->admin;
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
     * Get All Objects For A Manager By Her ID
     */
    public function getObjects($id)
    {
        try {
            $manager = Manager::find($id);

            if ($manager) {
                $admin = $manager->admin;
                $objects = $admin->objects;
                return ["results" => $objects, "err" => false, "err_msg" => ''];
            } else {
                return ["err" => true, "err_msg" => "id '$id' not exists"];
            }
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /** 
     * Get All Emprunts For A Manager By Her ID
     */
    public function getEmprunts($id)
    {
        try {
            $manager = Manager::find($id);

            if ($manager) {
                $admin = $manager->admin;
                $emprunts = $admin->emprunts;
                return ["results" => $emprunts, "err" => false, "err_msg" => ''];
            } else {
                return ["err" => true, "err_msg" => "id '$id' not exists"];
            }
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }
}
