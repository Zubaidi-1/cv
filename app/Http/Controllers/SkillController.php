<?php

namespace App\Http\Controllers;

use App\Http\Requests\SkillDeleteRequest;
use App\Http\Requests\SkillStoreRequest;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    //
    public function store(SkillStoreRequest $request)
    {
        //
        $validated = $request->validated();
        Skill::create([
            'name' => $validated['name'],
            'proficiency_level' => $validated['proficiency_level'] ?? null,
            'user_id' => $request->user()->id,
        ]);
        return redirect()->back()->with('success', 'Skill added successfully.');
    }

    public function destroy(SkillDeleteRequest $skillDeleteRequest, Skill $skill)
    {
        // * I just wanted to add a comment here
        $skill->delete();
        return redirect()->back()->with('success', 'Skill deleted successfully.');
    }
}
