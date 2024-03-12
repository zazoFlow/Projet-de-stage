<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmpruntController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\ObjectController;
use App\Http\Controllers\ObjectTypeController;
use App\Http\Controllers\UserController;

use App\Models\Admin;
use App\Models\Manager;
use App\Models\User_;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admins
Route::resource("Admin", AdminController::class);
Route::get("Admin/{id}/Managers", [AdminController::class, 'getManagers']);
Route::get("Admin/{id}/ObjectTypes", [AdminController::class, 'getObjectTypes']);
Route::get("Admin/{id}/Objects", [AdminController::class, 'getObjects']);
Route::get("Admin/{id}/Emprunts", [AdminController::class, 'getEmprunts']);

// Managers
Route::resource("Manager", ManagerController::class);
Route::get("Manager/{id}/ObjectTypes", [ManagerController::class, 'getObjectTypes']);
Route::get("Manager/{id}/Objects", [ManagerController::class, 'getObjects']);
Route::get("Manager/{id}/Emprunts", [ManagerController::class, 'getEmprunts']);

// Object Types
Route::resource("ObjectType", ObjectTypeController::class);

// Objects
Route::resource("Object", ObjectController::class);

// Emprunts
Route::resource("Emprunt", EmpruntController::class);

// Users
Route::resource("User", UserController::class);
Route::get("User/{id}/Emprunts", [UserController::class, 'getEmprunts']);

// Login
Route::post('Login', function (Request $request) {
    try {
        $type = $request["inpData"]["type"];
        $email = $request["inpData"]["email"];
        $password = $request["inpData"]["password"];

        if ($type === "admin") {
            $admin = Admin::all()->where("email", "=", $email)->where("password", "=", $password)->where("status", "=", "active")->first();
            if ($admin) return ["results" =>  $admin, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "Admin Not Exist | email: '$email'"];
        } else if ($type === "manager") {
            $manager = Manager::all()->where("email", "=", $email)->where("password", "=", $password)->where("status", "=", "active")->first();
            if ($manager) return ["results" =>  $manager, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "Manager Not Exist | email: '$email'"];
        } else if ($type === "user") {
            $user = User_::all()->where("email", "=", $email)->where("password", "=", $password)->where("status", "=", "active")->first();
            if ($user) return ["results" =>  $user, "err" => false, "err_msg" => ''];
            else return ["err" => true, "err_msg" => "User Not Exist | email: '$email'"];
        } else {
            return ["err" => true, "err_msg" => "Type is Incorrect | type: '$type'"];
        }
    } catch (Exception $e) {
        return ["err" => true, "err_msg" => $e->getMessage()];
    }
});


function str_random($len = 8)
{
    $caracters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $res = "";

    for ($i = 0; $i < $len; $i++) $res .= $caracters[rand(0, strlen($caracters) - 1)];

    return $res;
}

// Create Account
Route::post('CreateAccount', function (Request $request) {
    try {
        $type = $request["inpData"]["type"];
        $email = $request["inpData"]["email"];

        ////// Admin
        if ($type === "admin") {
            $admin = Admin::all()->where("email", "=", $email)->first();
            if ($admin) {
                if ($admin["status"] === "pas active") {
                    $password = str_random(10);
                    $admin->update(["password" => $password, "status" => "active"]);
                    $admin->save();
                    return ["results" => ["email" => $email, "password" => $password], "err" => false, "err_msg" => ""];
                } else {
                    return ["err" => true, "err_msg" => "email already active"];
                }
            } else return ["err" => true, "err_msg" => "email not exist"];

            // Manager
        } else if ($type === "manager") {
            $manager = Manager::all()->where("email", "=", $email)->first();
            if ($manager) {
                if ($manager["status"] === "pas active") {
                    $password = str_random(10);
                    $manager->update(["password" => $password, "status" => "active"]);
                    $manager->save();
                    return ["results" => ["email" => $email, "password" => $password], "err" => false, "err_msg" => ""];
                } else {
                    return ["err" => true, "err_msg" => "email already active"];
                }
            } else return ["err" => true, "err_msg" => "email not exist"];

            // User
        } else if ($type === "user") {
            $user = User_::all()->where("email", "=", $email)->first();
            if ($user) {
                if ($user["status"] === "pas active") {
                    $password = str_random(10);
                    $user->update(["password" => $password, "status" => "active"]);
                    $user->save();
                    return ["results" => ["email" => $email, "password" => $password], "err" => false, "err_msg" => ""];
                } else {
                    return ["err" => true, "err_msg" => "email already active"];
                }
            } else return ["err" => true, "err_msg" => "email not exist"];
        } else {
            return ["err" => true, "err_msg" => "Type is Incorrect | type: '$type'"];
        }
    } catch (Exception $e) {
        return ["err" => true, "err_msg" => $e->getMessage()];
    }
});
