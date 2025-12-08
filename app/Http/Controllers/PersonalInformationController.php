<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonalInformationStore;
use App\Models\PersonalInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PersonalInformationController extends Controller
{
    // * store personal information
    public function store(PersonalInformationStore $request)
    {
        $validated = $request->validated();

        PersonalInformation::updateOrCreate(
            ['user_id' => Auth::id()],
            $validated
        );

        return redirect()->route('dashboard')->with('success', 'Personal information saved successfully.');
    }

    // ! We can delete personal information on user's request
    public function destroy(Request $request)
    {
        $user = Auth::user();

        if ($user->personalInformation) {
            $user->personalInformation->delete();
            return redirect()->route('dashboard')->with('success', 'Personal information deleted successfully.');
        }

        return redirect()->route('dashboard')->with('error', 'No personal information found to delete.');
    }
}
