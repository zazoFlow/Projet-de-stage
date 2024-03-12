<?php

namespace App\Http\Controllers;

use App\Models\Object_;
use Exception;
use Illuminate\Http\Request;

class ObjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $objects = Object_::with("object_type")->get();
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
            Object_::create($request["dict"]);
            return ["results" => Object_::all(), "err" => false, "err_msg" => ''];
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
            $object = Object_::find($id);

            if ($object) return ["results" => $object, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "id '$id' not exists"];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Object_ $object_)
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
            $object = Object_::find($id);
            if ($object) {
                $object->update($request["seters"]);
                $object->save();
                return ["results" => Object_::all(), "err" => false, "err_msg" => ''];
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
            $res = Object_::destroy($id);
            if ($res === 0) return ["err" => true, "err_msg" => "id '$id' not exists"];
            else return ["results" => Object_::all(), "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }
}
