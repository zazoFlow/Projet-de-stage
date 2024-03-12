<?php

namespace App\Http\Controllers;

use App\Models\ObjectType;
use Exception;
use Illuminate\Http\Request;

class ObjectTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $object_types = ObjectType::all();
            return ["results" => $object_types, "err" => false, "err_msg" => ''];
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
            ObjectType::create($request["dict"]);
            return ["results" => ObjectType::all(), "err" => false, "err_msg" => ''];
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
            $object_type = ObjectType::find($id);

            if ($object_type) return ["results" => $object_type, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "id '$id' not exists"];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ObjectType $objectType)
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
            $object_type = ObjectType::find($id);
            if ($object_type) {
                $object_type->update($request["seters"]);
                $object_type->save();
                return ["results" => ObjectType::all(), "err" => false, "err_msg" => ''];
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
            $res = ObjectType::destroy($id);
            if ($res === 0) return ["err" => true, "err_msg" => "id '$id' not exists"];
            else return ["results" => ObjectType::all(), "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }
}
