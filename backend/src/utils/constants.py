import numpy as np

nx = 50
ny = 50
nz = 50

dt = 1e-4
dx = 0.1
dy = 0.1
dz = 0.2

tt = 0.0
ntime = 0.0

x = np.linspace(0, (nx + 1) * dx, nx + 1)
y = np.linspace(0, (ny + 1) * dy, ny + 1)
z = np.linspace(0, (nz + 1) * dz, nz + 1)

# variable for initial conditions
init_var = 1e-16

# heat cond electron, W/cmK
kte = 3.115

# electron density, g/cm3
roe = 4.56e-5

# electron heat capacity
Ce = 1.2e+3

# ion density, g/cm3
roi = 19.32

# ion heat capacity, J/gK
Ci = 0.132

# char temperature, K
T00 = 300.0

# velocity of sound, cm/s
u0 = 3.24e+5

# gamma el-phonon, W/cm3K
gamma = 0.25e+11

init_val = 1e-16

F = np.full((nx + 1, ny + 1, nz + 1), init_val)
tmpe0 = np.full((nx + 1, ny + 1, nz + 1), init_val)
tmpe1 = np.full((nx + 1, ny + 1, nz + 1), init_val)
tmpe2 = np.full((nx + 1, ny + 1, nz + 1), init_val)

tmpi0 = np.full((nx + 1, ny + 1, nz + 1), init_val)
tmpi1 = np.full((nx + 1, ny + 1, nz + 1), init_val)
tmpi2 = np.full((nx + 1, ny + 1, nz + 1), init_val)

xe = np.exp(-(x[(nx + 1) // 2] - x) ** 2)
ye = np.exp(-(y[(ny + 1) // 2] - y) ** 2)
ze = np.exp(-z)

fe = np.repeat(xe, ny + 1).reshape((nx + 1, ny + 1))
fe[:, :] *= ye

fe = np.repeat(fe, nz + 1).reshape((nx + 1, ny + 1, nz + 1))
fe *= ze
