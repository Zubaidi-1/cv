<?php

namespace App\Http\Controllers;

use App\Http\Requests\ObjectiveStoreRequest;
use App\Models\Objective;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ObjectiveController extends Controller
{
    public function store(ObjectiveStoreRequest $objectiveStoreRequest){
        $validated = $objectiveStoreRequest->validated();
        Objective::updateOrCreate(
            ['user_id' => Auth::id()],
            ['objective' => $validated['objective']]
        );
return redirect()->back()->with('success', 'Objective saved!');
    }
}
