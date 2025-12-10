<?php

namespace App\Http\Controllers;

use App\Http\Requests\EducationDeleteStore;
use App\Http\Requests\EducationStore;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EducationController extends Controller
{
    public function store(EducationStore $request)
    {
        $validated = $request->validated();

        Education::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Education information saved successfully.');
    }

    public function destroy(EducationDeleteStore $request, Education $education)
    {
        $education->delete();

        return redirect()->route('dashboard')->with('success', 'Education information deleted successfully.');
    }
}
