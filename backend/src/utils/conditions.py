from constants import *


class Conditions:

    @staticmethod
    def fill_init_cond() -> None:
        for i in range(0, Nx + 1):
            for j in range(0, Ny + 1):
                for k in range(0, Nz + 1):
                    tmpe0[i, j, k] = init_var
                    tmpe1[i, j, k] = init_var
                    tmpe2[i, j, k] = init_var
                    tmpi0[i, j, k] = init_var
                    tmpi1[i, j, k] = init_var
                    tmpi2[i, j, k] = init_var

    @staticmethod
    def fill_border_cond():
        for i in range(0, Nx + 1):
            for j in range(0, Ny + 1):
                tmpe1[i, j, Nz] = init_var
                tmpi1[i, j, Nz] = init_var

        for i in range(0, Nx + 1):
            for j in range(0, Ny + 1):
                tmpe1[i, j, 0] = tmpe1[i, j, 1]
                tmpi1[i, j, 0] = tmpi1[i, j, 1]

        for j in range(0, Ny + 1):
            for k in range(0, Nz + 1):
                tmpe1[0, j, k] = tmpe1[1, j, k]
                tmpi1[0, j, k] = tmpi1[1, j, k]

        for j in range(0, Ny + 1):
            for k in range(0, Nz + 1):
                tmpe1[Nx, j, k] = tmpe1[Nx-1, j, k]
                tmpi1[Nx, j, k] = tmpi1[Nx-1, j, k]

        for i in range(0, Nx + 1):
            for k in range(0, Nz + 1):
                tmpe1[i, 0, k] = tmpe1[i, 1, k]
                tmpi1[i, 0, k] = tmpi1[i, 1, k]

        for i in range(0, Nx + 1):
            for k in range(0, Nz + 1):
                tmpe1[i, Ny, k] = tmpe1[i, Ny-1, k]
                tmpi1[i, Ny, k] = tmpi1[i, Ny-1, k]
