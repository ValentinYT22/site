from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Track(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    artist: str = "AdamMM"
    duration: int  # in seconds
    src: str
    cover: str = "https://valentinyt22.github.io/site/Euyt.jpg"
    liked: bool = False


class Playlist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    cover: str = "https://valentinyt22.github.io/site/Euyt.jpg"
    tracks: List[str] = []  # track IDs
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PlaylistCreate(BaseModel):
    name: str
    cover: Optional[str] = None


class Video(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    youtubeId: str
    thumbnail: str


class FavoriteToggle(BaseModel):
    trackId: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "AdamMM Music API"}


@api_router.get("/tracks", response_model=List[Track])
async def get_tracks():
    tracks = await db.tracks.find({}, {"_id": 0}).to_list(1000)
    return tracks


@api_router.post("/tracks/seed")
async def seed_tracks():
    """Seed database with all tracks from the external site"""
    tracks_data = [
        {"title": "Germanusu", "src": "https://valentinyt22.github.io/site/Germanusu.mp3", "duration": 180},
        {"title": "Fara reguli", "src": "https://valentinyt22.github.io/site/Fara%20reguli.mp3", "duration": 200},
        {"title": "CulorideGri", "src": "https://valentinyt22.github.io/site/CulorideGri.mp3", "duration": 190},
        {"title": "Dincolo de Linia Fină", "src": "https://valentinyt22.github.io/site/Dincolo%20de%20Linia%20Fin%C4%83.mp3", "duration": 210},
        {"title": "Ecouri din Tăcere", "src": "https://valentinyt22.github.io/site/Ecouri%20din%20T%C4%83cere%20oficial.mp3", "duration": 195},
        {"title": "Azi, nu mâine", "src": "https://valentinyt22.github.io/site/Azi,%20nu%20m%C3%A2ine.mp3", "duration": 185},
        {"title": "Eu", "src": "https://valentinyt22.github.io/site/Eu.mp3", "duration": 175},
        {"title": "Pe Marginea Haosului", "src": "https://valentinyt22.github.io/site/Pe%20Marginea%20Haosului.mp3", "duration": 205},
        {"title": "Fara Harta", "src": "https://valentinyt22.github.io/site/Fara%20Harta.mp3", "duration": 188},
        {"title": "Schimbare de perspectivă", "src": "https://valentinyt22.github.io/site/Schimbare%20de%20perspectiv%C4%83%20v1.mp3", "duration": 192},
        {"title": "Stele Pe Cer", "src": "https://valentinyt22.github.io/site/Stele%20Pe%20Cer%202000.mp3", "duration": 198},
        {"title": "Vise de Cristal", "src": "https://valentinyt22.github.io/site/Vise%20de%20Cristal.mp3", "duration": 183},
        {"title": "Sub Stelele Noastre", "src": "https://valentinyt22.github.io/site/Sub%20Stelele%20Noastre%202000.mp3", "duration": 201},
        {"title": "Umbre si lumina", "src": "https://valentinyt22.github.io/site/Umdre%20si%20lumina%20v3.mp3", "duration": 189},
        {"title": "Sotto lo Stesso Cielo", "src": "https://valentinyt22.github.io/site/Sotto%20lo%20Stesso%20Cielo.mp3", "duration": 194},
        {"title": "Adevăr pe mute", "src": "https://valentinyt22.github.io/site/Adev%C4%83r%20pe%20mute.mp3", "duration": 187},
        {"title": "Alegeri și Risc", "src": "https://valentinyt22.github.io/site/Alegeri%20%C8%99i%20Risc.mp3", "duration": 196},
        {"title": "E O Stea", "src": "https://valentinyt22.github.io/site/E%20O%20Stea.mp3", "duration": 182},
        {"title": "Inima Pustie", "src": "https://valentinyt22.github.io/site/Inima%20Pustie.mp3", "duration": 191},
        {"title": "Steaua Mea", "src": "https://valentinyt22.github.io/site/Steaua%20Mea.mp3", "duration": 186},
        {"title": "Stele pe cer2", "src": "https://valentinyt22.github.io/site/Stele%20pe%20cer.mp3", "duration": 199},
        {"title": "Suflet dezarmat", "src": "https://valentinyt22.github.io/site/Suflet%20dezarmat.mp3", "duration": 193},
        {"title": "Real în 4K", "src": "https://valentinyt22.github.io/site/Real%20%C3%AEn%204K.mp3", "duration": 204},
        {"title": "Pe cont propriu", "src": "https://valentinyt22.github.io/site/Pe%20cont%20propriu%20v2.mp3", "duration": 197},
        {"title": "Nedrept", "src": "https://valentinyt22.github.io/site/Nedrept.mp3", "duration": 184},
        {"title": "Multe", "src": "https://valentinyt22.github.io/site/Multe.mp3", "duration": 179},
        {"title": "Internet", "src": "https://valentinyt22.github.io/site/IDK.mp3", "duration": 202},
        {"title": "Contra curentului", "src": "https://valentinyt22.github.io/site/Contra%20curentului.mp3", "duration": 188},
        {"title": "Contraste", "src": "https://valentinyt22.github.io/site/Contraste.mp3", "duration": 195},
        {"title": "Iubire sau doar chin", "src": "https://valentinyt22.github.io/site/Iubire%20sau%20doar%20chin.mp3", "duration": 190},
        {"title": "Simt vibe-ul rau", "src": "https://valentinyt22.github.io/site/Simt%20vibe-ul%20rau.mp3", "duration": 181},
        {"title": "Mișcă talia", "src": "https://valentinyt22.github.io/site/Mi%C8%99c%C4%83%20talia.mp3", "duration": 176},
        {"title": "Între oglinzi", "src": "https://valentinyt22.github.io/site/%C3%8Entre%20oglinzi.mp3", "duration": 192},
        {"title": "Valentin", "src": "https://valentinyt22.github.io/site/Valentin.mp3", "duration": 189},
        {"title": "Iubirea mea", "src": "https://valentinyt22.github.io/site/Iubirea%20mea.mp3", "duration": 194},
        {"title": "Eu Contra Lumii", "src": "https://valentinyt22.github.io/site/Eu%20Contra%20Lumii%20oficial.mp3", "duration": 207},
        {"title": "Mai Mult", "src": "https://valentinyt22.github.io/site/Mai%20Mult.mp3", "duration": 183},
        {"title": "Dragoste pentru Valentin", "src": "https://valentinyt22.github.io/site/Dragoste%20pentru%20Valentin.mp3", "duration": 198},
        {"title": "Dragostea ca Otravă", "src": "https://valentinyt22.github.io/site/Dragostea%20ca%20Otrav%C4%83.mp3", "duration": 201},
        {"title": "Dualitate", "src": "https://valentinyt22.github.io/site/Dualitate.mp3", "duration": 186},
        {"title": "Iluzii Sparte", "src": "https://valentinyt22.github.io/site/Iluzii%20Sparte.mp3", "duration": 195},
        {"title": "În Oglindă", "src": "https://valentinyt22.github.io/site/%C3%8En%20Oglind%C4%83.mp3", "duration": 191},
        {"title": "Pe buze tu", "src": "https://valentinyt22.github.io/site/Pe%20buze%20tu.mp3", "duration": 177},
        {"title": "Spuneai ca ma iubesti", "src": "https://valentinyt22.github.io/site/Spuneai%20ca%20ma%20iubesti.mp3", "duration": 188},
        {"title": "doar noi doi", "src": "https://valentinyt22.github.io/site/doar%20noi%20doi.mp3", "duration": 193},
        {"title": "Ți-ai bătut joc de un înger", "src": "https://valentinyt22.github.io/site/Ti-ai%20batut%20joc%20de%20un%20inger.mp3", "duration": 199},
        {"title": "Sterge naiba lacrima", "src": "https://valentinyt22.github.io/site/Sterge%20naiba%20lacrima.mp3", "duration": 185},
        {"title": "Blestem pentru o mincinoasă", "src": "https://valentinyt22.github.io/site/Blestem%20pentru%20o%20mincinoas%C4%83.mp3", "duration": 203}
    ]
    
    # Clear existing tracks
    await db.tracks.delete_many({})
    
    # Insert tracks
    tracks = [Track(**data).model_dump() for data in tracks_data]
    await db.tracks.insert_many(tracks)
    
    return {"message": f"Seeded {len(tracks)} tracks"}


@api_router.post("/favorites/toggle")
async def toggle_favorite(data: FavoriteToggle):
    track = await db.tracks.find_one({"id": data.trackId}, {"_id": 0})
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    
    new_liked = not track.get("liked", False)
    await db.tracks.update_one({"id": data.trackId}, {"$set": {"liked": new_liked}})
    
    return {"trackId": data.trackId, "liked": new_liked}


@api_router.get("/favorites", response_model=List[Track])
async def get_favorites():
    tracks = await db.tracks.find({"liked": True}, {"_id": 0}).to_list(1000)
    return tracks


@api_router.post("/playlists", response_model=Playlist)
async def create_playlist(input: PlaylistCreate):
    playlist_obj = Playlist(name=input.name, cover=input.cover or "https://valentinyt22.github.io/site/Euyt.jpg")
    doc = playlist_obj.model_dump()
    doc['createdAt'] = doc['createdAt'].isoformat()
    await db.playlists.insert_one(doc)
    return playlist_obj


@api_router.get("/playlists", response_model=List[Playlist])
async def get_playlists():
    playlists = await db.playlists.find({}, {"_id": 0}).to_list(1000)
    for playlist in playlists:
        if isinstance(playlist['createdAt'], str):
            playlist['createdAt'] = datetime.fromisoformat(playlist['createdAt'])
    return playlists


@api_router.post("/playlists/{playlist_id}/tracks")
async def add_track_to_playlist(playlist_id: str, data: FavoriteToggle):
    playlist = await db.playlists.find_one({"id": playlist_id})
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    
    track = await db.tracks.find_one({"id": data.trackId})
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    
    if data.trackId not in playlist.get("tracks", []):
        await db.playlists.update_one(
            {"id": playlist_id},
            {"$push": {"tracks": data.trackId}}
        )
    
    return {"message": "Track added to playlist"}


@api_router.get("/playlists/{playlist_id}/tracks", response_model=List[Track])
async def get_playlist_tracks(playlist_id: str):
    playlist = await db.playlists.find_one({"id": playlist_id})
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    
    track_ids = playlist.get("tracks", [])
    tracks = await db.tracks.find({"id": {"$in": track_ids}}, {"_id": 0}).to_list(1000)
    return tracks


@api_router.get("/videos", response_model=List[Video])
async def get_videos():
    videos = await db.videos.find({}, {"_id": 0}).to_list(1000)
    return videos


@api_router.post("/videos/seed")
async def seed_videos():
    """Seed database with all YouTube videos"""
    videos_data = [
        {"title": "Împărăția Gheții", "youtubeId": "csWXCLusRkI", "thumbnail": "https://i.ytimg.com/vi/csWXCLusRkI/mqdefault.jpg"},
        {"title": "Ce s-a întâmplat cu noi?", "youtubeId": "cBZ0vtGBs8g", "thumbnail": "https://i.ytimg.com/vi/cBZ0vtGBs8g/mqdefault.jpg"},
        {"title": "Iubirea Toxică", "youtubeId": "mzgZI19Oj_A", "thumbnail": "https://i.ytimg.com/vi/mzgZI19Oj_A/mqdefault.jpg"},
        {"title": "Umbre Pe Beat", "youtubeId": "p97z3bDusOY", "thumbnail": "https://i.ytimg.com/vi/p97z3bDusOY/mqdefault.jpg"},
        {"title": "Baby, tu ești toxică", "youtubeId": "v16JuylUbxw", "thumbnail": "https://i.ytimg.com/vi/v16JuylUbxw/mqdefault.jpg"},
        {"title": "Din Mii", "youtubeId": "o8tgRX2xSZs", "thumbnail": "https://i.ytimg.com/vi/o8tgRX2xSZs/mqdefault.jpg"},
        {"title": "Iubire cu otravă", "youtubeId": "iAPKTCGDvbo", "thumbnail": "https://i.ytimg.com/vi/iAPKTCGDvbo/mqdefault.jpg"},
        {"title": "Andreea top", "youtubeId": "OU4Gw3uAGfo", "thumbnail": "https://i.ytimg.com/vi/OU4Gw3uAGfo/mqdefault.jpg"},
        {"title": "Antidot", "youtubeId": "qfzWXK9NQ0c", "thumbnail": "https://i.ytimg.com/vi/qfzWXK9NQ0c/mqdefault.jpg"},
        {"title": "Totul este toxic", "youtubeId": "aCK-hOnVy5I", "thumbnail": "https://i.ytimg.com/vi/aCK-hOnVy5I/mqdefault.jpg"},
        {"title": "Iadul Tău", "youtubeId": "bzCbWfUifwc", "thumbnail": "https://i.ytimg.com/vi/bzCbWfUifwc/mqdefault.jpg"},
        {"title": "Toxic love", "youtubeId": "PeJf27TeoGY", "thumbnail": "https://i.ytimg.com/vi/PeJf27TeoGY/mqdefault.jpg"}
    ]
    
    # Clear existing videos
    await db.videos.delete_many({})
    
    # Insert videos
    videos = [Video(**data).model_dump() for data in videos_data]
    await db.videos.insert_many(videos)
    
    return {"message": f"Seeded {len(videos)} videos"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
