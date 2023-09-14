<?php

namespace YourProject\YourDomain\Data;

use Carbon\Carbon;
use App\Models\User;
use Incrivel\Goals\Models\Goal;

class TaskRepositoryFilterData
{
    public function __construct(
        public ?User $user = null,
        public ?Goal $goal = null,
        public ?bool $completed = null,
        public ?Carbon $date = null,
    ) {}
}
