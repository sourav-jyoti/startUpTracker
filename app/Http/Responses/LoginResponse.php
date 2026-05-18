<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $user = Auth::user();
        
        // Redirect admins directly to the administrative console
        $redirectUrl = ($user && $user->is_admin) 
            ? '/admin/dashboard' 
            : '/dashboard';

        return $request->wantsJson()
            ? response()->json(['two_factor' => false])
            : redirect()->intended($redirectUrl);
    }
}
