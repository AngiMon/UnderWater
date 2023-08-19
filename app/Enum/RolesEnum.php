<?php

namespace App\Enum;

enum RolesEnum: string
{
    case ADMIN = 'admin';
    case USER = 'user';

    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @return RolesEnum[]
     */
    public static function getCases(): array
    {
        return self::cases();
    }
}
