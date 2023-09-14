<?php

namespace YourProject\YourDomain\Policies;

use App\Models\User;
use YourProject\YourDomain\Models\YourModel;

class YourModelPolicy
{
    public function create(User $user): bool
    {
        return true;
    }

    public function find(User $user, YourModel $yourModel): bool
    {
        return true;
    }

    public function update(User $user, YourModel $yourModel): bool
    {
        return true;
    }

    public function delete(User $user, YourModel $yourModel): bool
    {
        return true;
    }
}
