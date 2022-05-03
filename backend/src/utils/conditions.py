import numpy as np

from src.utils.constants import *


class Conditions:

    @staticmethod
    def fill_init_cond(arrays) -> None:
        tmpe0, tmpe1, tmpe2, tmpi0, tmpi1, tmpi2 = arrays
        tmpe0 = np.full((nx+1, ny+1, nz+1), init_var)
        tmpe1 = np.full((nx+1, ny+1, nz+1), init_var)
        tmpe2 = np.full((nx+1, ny+1, nz+1), init_var)

        tmpi0 = np.full((nx+1, ny+1, nz+1), init_var)
        tmpi1 = np.full((nx+1, ny+1, nz+1), init_var)
        tmpi2 = np.full((nx+1, ny+1, nz+1), init_var)

    @staticmethod
    def fill_border_cond1():
        tmpe1[:, :, nz] = init_var
        tmpi1[:, :, nz] = init_var

        tmpe1[:, :, 0] = tmpe1[:, :, 1]
        tmpi1[:, :, 0] = tmpi1[:, :, 1]

        tmpe1[0] = tmpe1[1]
        tmpi1[0] = tmpi1[1]

        tmpe1[nx] = tmpe1[nx-1]
        tmpi1[nx] = tmpi1[nx-1]

        tmpe1[:, 0] = tmpe1[:, 1]
        tmpi1[:, 0] = tmpi1[:, 1]

        tmpe1[:, ny] = tmpe1[:, ny-1]
        tmpi1[:, ny] = tmpi1[:, ny-1]

    @staticmethod
    def fill_border_cond2():
        tmpe2[:, :, nz] = init_var
        tmpi2[:, :, nz] = init_var

        tmpe2[:, :, 0] = tmpe2[:, :, 1]
        tmpi2[:, :, 0] = tmpi2[:, :, 1]

        tmpe2[0] = tmpe2[1]
        tmpi2[0] = tmpi2[1]

        tmpe2[nx] = tmpe2[nx - 1]
        tmpi2[nx] = tmpi2[nx - 1]

        tmpe2[:, 0] = tmpe2[:, 1]
        tmpi2[:, 0] = tmpi2[:, 1]

        tmpe2[:, ny] = tmpe2[:, ny - 1]
        tmpi2[:, ny] = tmpi2[:, ny - 1]
