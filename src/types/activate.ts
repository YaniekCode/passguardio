/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Copyright (C) 2026 YaniekCode
 *
 * This file is part of PassGuardio.
 *
 * PassGuardio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PassGuardio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PassGuardio.  If not, see <https://www.gnu.org/licenses/>.
*/

import type { TokenDatabaseRecordType } from '@/types';

export type ActivateUserFieldErrors = {
    username?: string;
    email?: string;
    password?: string;
}

export type ActivateTokenState = 
    | {
        success: true;
        data: TokenDatabaseRecordType
    } | {
        success: false,
        notFound: boolean,
        formError?: string,
        error?: string
    }


export type ActivateUserState = 
    | {
        success: true;
        message: string;
    }
    | {
        success: false;
        formErrors?: ActivateUserFieldErrors;
        error?: string;
    }

export type ActivateUserValidationResult =
  | {
      success: true;
      data: {
        username: string;
        email: string;
        password: string;
      };
    }
  | {
      success: false;
	  formErrors: ActivateUserFieldErrors;
      error: string;
    };