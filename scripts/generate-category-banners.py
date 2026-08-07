import numpy as np
from scipy.spatial import Delaunay
import random

def poisson_like_points(w, h, n_target, min_dist_factor=0.75, seed=0):
    """Irregular blue-noise-ish point set via naive rejection sampling with varying local density."""
    rng = random.Random(seed)
    np_rng = np.random.default_rng(seed)
    area = w * h
    # base min distance from target count
    base_min_dist = np.sqrt(area / n_target) * min_dist_factor
    pts = []
    attempts = 0
    max_attempts = n_target * 60
    while len(pts) < n_target and attempts < max_attempts:
        attempts += 1
        x = rng.uniform(0, w)
        y = rng.uniform(0, h)
        # vary local density: allow closer spacing near edges for finer facets, larger in middle
        local_min = base_min_dist * rng.uniform(0.4, 2.1)
        ok = True
        for (px, py) in pts:
            dx = px - x; dy = py - y
            if dx*dx + dy*dy < local_min*local_min:
                ok = False
                break
        if ok:
            pts.append((x, y))
    return np.array(pts)

def build_lowpoly(w, h, n_points, seed, height_scale=1.0):
    rng = np.random.default_rng(seed)
    interior = poisson_like_points(w, h, n_points, seed=seed)
    # border points to make sure canvas fully covered, irregular spacing along edges
    border = []
    for edge in range(4):
        count = rng.integers(5, 9)
        offs = np.sort(rng.uniform(0, 1, count))
        for t in offs:
            jitter = rng.uniform(-6, 6)
            if edge == 0:
                border.append((t*w, 0 + jitter*0))
            elif edge == 1:
                border.append((w, t*h))
            elif edge == 2:
                border.append((t*w, h))
            else:
                border.append((0, t*h))
    corners = [(0,0),(w,0),(w,h),(0,h)]
    pts = np.vstack([interior, np.array(border), np.array(corners)])
    tri = Delaunay(pts)
    # random height per vertex for chaotic crumpled-foil faceting
    heights = rng.uniform(0, 1, size=len(pts)) * height_scale
    # add a broad low-frequency component so it's not pure noise - some coherent 'folds'
    low_freq = (np.sin(pts[:,0]/w*3.0 + rng.uniform(0,6)) * np.cos(pts[:,1]/h*2.3 + rng.uniform(0,6)))
    heights = 0.82*heights + 0.18*(low_freq*0.5+0.5)
    return pts, tri.simplices, heights

def shade_triangles(pts, simplices, heights, light_dir=(-0.5, -0.6, 1.0), z_amp=140.0):
    light = np.array(light_dir, dtype=float)
    light = light / np.linalg.norm(light)
    tris = []
    for s in simplices:
        p = pts[s]
        z = heights[s] * z_amp
        v0 = np.array([p[0][0], p[0][1], z[0]])
        v1 = np.array([p[1][0], p[1][1], z[1]])
        v2 = np.array([p[2][0], p[2][1], z[2]])
        n = np.cross(v1 - v0, v2 - v0)
        norm = np.linalg.norm(n)
        if norm == 0:
            continue
        n = n / norm
        if n[2] < 0:
            n = -n
        brightness = float(np.dot(n, light))
        brightness = max(0.0, min(1.0, brightness))
        tris.append((p, brightness))
    return tris

def lerp(a, b, t):
    return a + (b - a) * t

def color_ramp(brightness, stops):
    # stops: list of (t, (r,g,b))
    for i in range(len(stops)-1):
        t0, c0 = stops[i]
        t1, c1 = stops[i+1]
        if t0 <= brightness <= t1:
            local_t = (brightness - t0) / (t1 - t0) if t1 > t0 else 0
            r = lerp(c0[0], c1[0], local_t)
            g = lerp(c0[1], c1[1], local_t)
            b = lerp(c0[2], c1[2], local_t)
            return (int(r), int(g), int(b))
    return stops[-1][1]

def build_svg(w, h, tris, stops, seed_noise=0.0):
    rng = np.random.default_rng(int(seed_noise*1000)+1)
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">']
    parts.append(f'<rect width="{w}" height="{h}" fill="rgb{color_ramp(0.15, stops)}"/>')
    for (p, b) in tris:
        # slight per-triangle brightness jitter for extra chaotic sparkle
        b2 = max(0.0, min(1.0, b + rng.uniform(-0.04, 0.04)))
        r,g,bl = color_ramp(b2, stops)
        pts_str = " ".join(f"{x:.1f},{y:.1f}" for x,y in p)
        parts.append(f'<polygon points="{pts_str}" fill="rgb({r},{g},{bl})" />')
    parts.append('</svg>')
    return "\n".join(parts)

GOLD_STOPS = [
    (0.0, (35, 22, 8)),
    (0.15, (74, 46, 12)),
    (0.35, (138, 92, 24)),
    (0.55, (196, 145, 45)),
    (0.72, (231, 185, 90)),
    (0.86, (250, 218, 140)),
    (1.0, (255, 245, 210)),
]
SILVER_STOPS = [
    (0.0, (22, 24, 28)),
    (0.15, (46, 50, 56)),
    (0.35, (92, 98, 106)),
    (0.55, (140, 146, 152)),
    (0.72, (188, 192, 196)),
    (0.86, (222, 224, 226)),
    (1.0, (250, 250, 252)),
]
BRONZE_STOPS = [
    (0.0, (30, 14, 12)),
    (0.15, (62, 26, 20)),
    (0.35, (110, 48, 32)),
    (0.55, (162, 82, 46)),
    (0.72, (200, 122, 68)),
    (0.86, (226, 165, 110)),
    (1.0, (248, 214, 176)),
]

W, H = 900, 560

configs = [
    ("gold", GOLD_STOPS, 11, 220, (-0.55,-0.65,1.0)),
    ("silver", SILVER_STOPS, 22, 190, (-0.6,-0.5,1.0)),
    ("bronze", BRONZE_STOPS, 33, 205, (-0.45,-0.7,1.0)),
]

for name, stops, seed, npts, light in configs:
    pts, simplices, heights = build_lowpoly(W, H, npts, seed=seed)
    tris = shade_triangles(pts, simplices, heights, light_dir=light)
    svg = build_svg(W, H, tris, stops, seed_noise=seed)
    with open(f"/home/claude/lowpoly/{name}-lowpoly.svg", "w") as f:
        f.write(svg)
    print(name, "triangles:", len(tris))

# ===== SOFT / LIGHTENED VARIANTS (텍스트 가독성용, 코인 없이 배경만 사용) =====
def lighten_svg(svg_text, blend_white=0.42, darken_floor=0.0):
    import re
    def repl(m):
        r,g,b = int(m.group(1)), int(m.group(2)), int(m.group(3))
        r = int(r + (255-r)*blend_white)
        g = int(g + (255-g)*blend_white)
        b = int(b + (255-b)*blend_white)
        return f'fill="rgb({r},{g},{b})"'
    return re.sub(r'fill="rgb\((\d+),(\d+),(\d+)\)"', repl, svg_text)

for name in ["gold", "silver", "bronze"]:
    with open(f"/home/claude/lowpoly/{name}-lowpoly.svg") as f:
        svg = f.read()
    soft = lighten_svg(svg, blend_white=0.40)
    with open(f"/home/claude/lowpoly/{name}-lowpoly-soft.svg", "w") as f:
        f.write(soft)
print("soft variants done")


# ===== SOFT2 (텍스트 가독성용, 대비 압축) 팔레트 재생성 =====
import base64

# 압축된(대비 축소) 톤 - 진한 골드/실버/브론즈 색조는 유지하되 가장 어둡고 가장 밝은 극단만 완화
GOLD_SOFT = [
    (0.0, (92, 66, 28)),
    (0.15, (122, 89, 34)),
    (0.35, (162, 122, 48)),
    (0.55, (196, 155, 72)),
    (0.72, (218, 180, 105)),
    (0.86, (232, 200, 140)),
    (1.0, (245, 220, 172)),
]
SILVER_SOFT = [
    (0.0, (72, 76, 82)),
    (0.15, (96, 100, 106)),
    (0.35, (128, 132, 138)),
    (0.55, (160, 163, 168)),
    (0.72, (188, 190, 194)),
    (0.86, (210, 211, 214)),
    (1.0, (232, 233, 235)),
]
BRONZE_SOFT = [
    (0.0, (88, 52, 38)),
    (0.15, (114, 68, 46)),
    (0.35, (148, 92, 58)),
    (0.55, (178, 118, 76)),
    (0.72, (202, 148, 104)),
    (0.86, (222, 176, 138)),
    (1.0, (240, 202, 168)),
]

W, H = 900, 560
configs = [
    ("gold", GOLD_SOFT, 11, 220, (-0.55,-0.65,1.0)),
    ("silver", SILVER_SOFT, 22, 190, (-0.6,-0.5,1.0)),
    ("bronze", BRONZE_SOFT, 33, 205, (-0.45,-0.7,1.0)),
]

for name, stops, seed, npts, light in configs:
    pts, simplices, heights = build_lowpoly(W, H, npts, seed=seed)
    tris = shade_triangles(pts, simplices, heights, light_dir=light)
    svg = build_svg(W, H, tris, stops, seed_noise=seed)
    path = f"/home/claude/lowpoly/{name}-lowpoly-soft2.svg"
    with open(path, "w") as f:
        f.write(svg)
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    with open(f"/home/claude/lowpoly/{name}-lowpoly-soft2.b64", "w") as f:
        f.write(b64)
    print(name, "done", len(tris))
