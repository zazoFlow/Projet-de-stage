<?php

namespace App\Http\Controllers;

use App\Models\Emprunt;
use Exception;
use Illuminate\Http\Request;

class EmpruntController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $emprunts = Emprunt::all();
            return ["results" => $emprunts, "err" => false, "err_msg" => ''];
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
            Emprunt::create($request["dict"]);
            return ["results" => Emprunt::all(), "err" => false, "err_msg" => ''];
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
            $emprunt = Emprunt::find($id);

            if ($emprunt) return ["results" => $emprunt, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "id '$id' not exists"];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Emprunt $emprunt)
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

            $emprunt = Emprunt::find($id);
            if ($emprunt) {
                $emprunt->update($request["seters"]);
                $emprunt->save();
                return ["results" => Emprunt::all(), "err" => false, "err_msg" => ''];
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
            $res = Emprunt::destroy($id);
            if ($res === 0) return ["err" => true, "err_msg" => "id '$id' not exists"];
            else return ["results" => Emprunt::all(), "err" => false, "err_msg" => ''];
        } catch (Exception $e) {
            return ["err" => true, "err_msg" => $e->getMessage()];
        }
    }
}
