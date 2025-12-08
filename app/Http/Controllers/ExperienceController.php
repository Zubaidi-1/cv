<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExperienceDeleteRequest;
use App\Http\Requests\ExperienceStoreRequest;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExperienceController extends Controller
{
    public function store(ExperienceStoreRequest $request)
    {
        // Store experience logic
        $validated = $request->validated();
        Experience::create([
            'title' => $validated['title'],
            'company' => $validated['company'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'description' => $validated['description'],
            'user_id' => Auth::id(),
        ]);
        return redirect()->back()->with('success', 'Experience added successfully.');
    }
    public function destroy(ExperienceDeleteRequest $experienceDeleteRequest, Experience $experience)
    {
        // Delete experience 
        $experience->delete();
        return redirect()->back()->with('success', 'Experience deleted successfully.');
    }
}
