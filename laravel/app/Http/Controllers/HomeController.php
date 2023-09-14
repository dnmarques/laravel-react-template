<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ViewModels\HomeViewModel;

class HomeController extends Controller
{
    public function __construct(
    ){}

    public function index(Request $request)
    {
        return view('home', HomeViewModel::fromRequest($request));
    }
}
