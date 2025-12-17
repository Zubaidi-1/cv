<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LayoutController extends Controller
{
    public function index(){
       $layouts = Layout::all();
       foreach($layouts as $layout){
        $layout->default_config = json_decode($layout->default_config, true);
       }
       return  Inertia::render('Layouts/Index',[
        'layouts' => $layouts
       ]);
    }
    public function show(Layout $layout){
        $selectLayout = Layout::findOrFail($layout->id);
        $layout_name = $selectLayout->name;
        $layout_name = Str::ucfirst($layout_name);
        return Inertia::render("Layouts/$layout_name",[
            'layout' => $selectLayout
        ]);
    }
}
