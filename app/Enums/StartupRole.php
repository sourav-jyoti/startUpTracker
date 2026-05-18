<?php

namespace App\Enums;

enum StartupRole: string
{
    case Founder = 'founder';
    case Member = 'member';
    case Viewer = 'viewer';
}
